const express = require('express');
const cors = require('cors');
const webpush = require('web-push');
const cron = require('node-cron');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// VAPID Keys (replace with your actual keys)
const vapidKeys = {
  publicKey: 'BHQZEGALEQuASAzX6HMfnO7nvZAs545ePgt1mh2tGYpSptvdH7WTYYTiLXUpH9svd4NrECGx30JiTkss75t5EZU',
  privateKey: 'YFFBAWB7hcFlcCiFGKssg6a6ngTbv4HZTxLnZSw1Ux8'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// In-memory storage (in production, use a real database)
const pushSubscriptions = new Map();
const screeningReminders = new Map();
const screeningData = new Map();

// API Endpoints

// Save push subscription
app.post('/api/push-subscription', (req, res) => {
  try {
    const { phone, subscription } = req.body;
    
    console.log('Saving subscription for:', phone);
    console.log('Subscription:', subscription);
    
    // Save subscription
    pushSubscriptions.set(phone, subscription);
    
    res.json({ success: true, message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ success: false, error: 'Failed to save subscription' });
  }
});

// Notifications
app.post('/api/notifications', (req, res) => {
  try {
    const { phone, notification } = req.body;
    
    console.log('Saving notification for:', phone);
    console.log('Notification:', notification);
    
    // In production, save to database
    // For now, just log it
    
    res.json({ success: true, message: 'Notification saved successfully' });
  } catch (error) {
    console.error('Error saving notification:', error);
    res.status(500).json({ success: false, error: 'Failed to save notification' });
  }
});

app.get('/api/notifications/:phone', (req, res) => {
  try {
    const { phone } = req.params;
    // In production, fetch from database
    // For now, return empty array
    res.json([]);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.put('/api/notifications/:phone/:notificationId/read', (req, res) => {
  try {
    const { phone, notificationId } = req.params;
    
    console.log(`Marking notification ${notificationId} as read for ${phone}`);
    
    // In production, update database
    // For now, just log it
    
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ success: false, error: 'Failed to mark notification as read' });
  }
});

// Create screening reminder
app.post('/api/screening-reminders', (req, res) => {
  try {
    const { phone, screeningDate } = req.body;
    
    console.log('Creating reminder for:', phone, 'Date:', screeningDate);
    
    // Save reminder
    screeningReminders.set(phone, {
      screeningDate,
      reminder2DaysSent: false,
      reminder1DaySent: false,
      reminderMorningSent: false,
      createdAt: new Date()
    });
    
    res.json({ success: true, message: 'Reminder created successfully' });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ success: false, error: 'Failed to create reminder' });
  }
});

// Get screening reminders
app.get('/api/screening-reminders/:phone', (req, res) => {
  try {
    const { phone } = req.params;
    const reminder = screeningReminders.get(phone);
    
    if (!reminder) {
      return res.json([]);
    }
    
    res.json([reminder]);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
});

// Get screening data
app.get('/api/screening/:phone', (req, res) => {
  try {
    const { phone } = req.params;
    const screening = screeningData.get(phone);
    
    if (!screening) {
      return res.json(null);
    }
    
    res.json(screening);
  } catch (error) {
    console.error('Error fetching screening:', error);
    res.status(500).json({ error: 'Failed to fetch screening' });
  }
});

// Save screening data
app.post('/api/screening', (req, res) => {
  try {
    const { phone, age, center, date, reminder } = req.body;
    
    console.log('Saving screening data for:', phone);
    console.log('Data:', { age, center, date, reminder });
    
    // Save to in-memory storage
    screeningData.set(phone, {
      age,
      center,
      date,
      reminder,
      savedAt: new Date().toISOString(),
      completed: false, // Track if screening was completed
      completedAt: null
    });
    
    res.json({ success: true, message: 'Screening data saved successfully' });
  } catch (error) {
    console.error('Error saving screening:', error);
    res.status(500).json({ success: false, error: 'Failed to save screening' });
  }
});

// Update screening completion status
app.post('/api/screening/completed', (req, res) => {
  try {
    const { phone, completed } = req.body;
    
    console.log('Updating screening completion for:', phone, 'Completed:', completed);
    
    // Get existing screening data
    const screening = screeningData.get(phone);
    if (screening) {
      screening.completed = completed;
      screening.completedAt = completed ? new Date().toISOString() : null;
      screeningData.set(phone, screening);
    }
    
    res.json({ success: true, message: 'Screening completion updated successfully' });
  } catch (error) {
    console.error('Error updating screening completion:', error);
    res.status(500).json({ success: false, error: 'Failed to update screening completion' });
  }
});

// Send test push notification
app.post('/api/send-test-notification', async (req, res) => {
  try {
    const { phone, message, title } = req.body;
    const subscription = pushSubscriptions.get(phone);
    
    if (!subscription) {
      return res.status(404).json({ success: false, error: 'No subscription found' });
    }
    
    const payload = JSON.stringify({
      title: title || 'CervicoApp Notification',
      body: message,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        url: '/screening'
      },
      actions: [
        {
          action: 'open',
          title: 'Open App',
          icon: '/icon-96x96.png'
        }
      ]
    });
    
    await webpush.sendNotification(subscription, payload);
    
    res.json({ success: true, message: 'Test notification sent' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, error: 'Failed to send notification' });
  }
});

// Daily reminder check (runs every day at 9 AM)
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily reminder check...');
  await checkAndSendReminders();
});

// Manual trigger for testing
app.post('/api/check-reminders', async (req, res) => {
  try {
    await checkAndSendReminders();
    res.json({ success: true, message: 'Reminder check completed' });
  } catch (error) {
    console.error('Error checking reminders:', error);
    res.status(500).json({ success: false, error: 'Failed to check reminders' });
  }
});

// Helper function to check and send reminders
async function checkAndSendReminders() {
  console.log(`Checking reminders for ${screeningReminders.size} users`);
  
  for (const [phone, reminder] of screeningReminders.entries()) {
    const subscription = pushSubscriptions.get(phone);
    if (!subscription) continue;
    
    const screeningDate = new Date(reminder.screeningDate);
    const now = new Date();
    
    // Calculate time differences
    const twoDaysBefore = new Date(screeningDate);
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
    twoDaysBefore.setHours(9, 0, 0, 0);
    
    const oneDayBefore = new Date(screeningDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    oneDayBefore.setHours(9, 0, 0, 0);
    
    const morningOf = new Date(screeningDate);
    morningOf.setHours(9, 0, 0, 0);
    
    console.log(`Checking reminders for ${phone}:`);
    console.log(`Screening date: ${screeningDate.toDateString()}`);
    console.log(`Now: ${now.toDateString()}`);
    console.log(`2 days before: ${twoDaysBefore.toDateString()}`);
    console.log(`1 day before: ${oneDayBefore.toDateString()}`);
    console.log(`Morning of: ${morningOf.toDateString()}`);
    
    try {
      // Check 2 days before reminder
      if (!reminder.reminder2DaysSent && now >= twoDaysBefore && now < oneDayBefore) {
        await sendReminderNotification(subscription, phone, 
          'Screening Reminder', 
          `Your cervical cancer screening is scheduled for ${screeningDate.toLocaleDateString()} in 2 days. Please prepare for your appointment.`
        );
        
        reminder.reminder2DaysSent = true;
        console.log(`Sent 2-day reminder to ${phone}`);
      }
      
      // Check 1 day before reminder
      else if (!reminder.reminder1DaySent && now >= oneDayBefore && now < morningOf) {
        await sendReminderNotification(subscription, phone, 
          'Screening Reminder', 
          `Your cervical cancer screening is scheduled for tomorrow (${screeningDate.toLocaleDateString()}). Don't forget your appointment!`
        );
        
        reminder.reminder1DaySent = true;
        console.log(`Sent 1-day reminder to ${phone}`);
      }
      
      // Check morning of reminder
      else if (!reminder.reminderMorningSent && now >= morningOf && now < new Date(morningOf.getTime() + 2 * 60 * 60 * 1000)) {
        await sendReminderNotification(subscription, phone, 
          'Screening Today!', 
          `Your cervical cancer screening is scheduled for today at ${screeningDate.toLocaleTimeString()}. Please arrive on time. Click here to confirm when you've completed your screening.`
        );
        
        reminder.reminderMorningSent = true;
        console.log(`Sent morning reminder to ${phone}`);
        
        // Reset reminder after screening date passes
        if (now > screeningDate) {
          screeningReminders.delete(phone);
          console.log(`Removed expired reminder for ${phone}`);
        }
      }
      
      // Check for screening completion reminder (if not completed and it's screening day)
      const screening = screeningData.get(phone);
      if (screening && !screening.completed && screening.date === now.toISOString().split('T')[0]) {
        const screeningHour = parseInt(screeningDate.toLocaleTimeString().split(':')[0]);
        const currentHour = now.getHours();
        
        // Send completion reminder 2 hours after scheduled time
        if (currentHour >= screeningHour + 2 && !reminder.completionReminderSent) {
          await sendReminderNotification(subscription, phone,
            'Screening Completion Reminder',
            'Did you complete your cervical cancer screening today? Please click Yes to confirm your attendance.'
          );
          
          reminder.completionReminderSent = true;
          console.log(`Sent completion reminder to ${phone}`);
        }
      }
    } catch (error) {
      console.error(`Error sending reminder to ${phone}:`, error);
    }
  }
}

// Helper function to send notification
async function sendReminderNotification(subscription, phone, title, body) {
  try {
    const payload = JSON.stringify({
      title,
      body,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        type: 'screening_reminder',
        phone: phone,
        confirm_completion: title.includes('Completion Reminder')
      },
      actions: title.includes('Completion Reminder') ? [
        {
          action: 'confirm_completion',
          title: 'Confirm Screening',
          icon: '/icon-96x96.png'
        },
        {
          action: 'open',
          title: 'Open App',
          icon: '/icon-96x96.png'
        }
      ] : [
        {
          action: 'open',
          title: 'Open App',
          icon: '/icon-96x96.png'
        }
      ]
    });
    
    await webpush.sendNotification(subscription, payload);
    console.log(`Notification sent to ${phone}: ${title}`);
  } catch (error) {
    console.error(`Failed to send notification to ${phone}:`, error);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    subscriptions: pushSubscriptions.size,
    reminders: screeningReminders.size
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Push notification server running on port ${PORT}`);
  console.log(`HTTPS setup: https://localhost:${PORT}`);
  console.log('Health check: http://localhost:3001/api/health');
});

module.exports = app;
