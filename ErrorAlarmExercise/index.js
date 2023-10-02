import fs from 'fs/promises';

export const alarmSystem = {
  errorTimestamps: [],
  lastEmailSentTime: null,

  appendErrorToFile: async function (error) {
    try {
      const filePath = 'logs.txt';
      await fs.appendFile(filePath, `${error}\n`);
      console.log('Error appended to the file');
    } catch (err) {
      console.log(err.message);
    }
  },

  sendEmailNotification: function () {
    console.log('Email sent: High error rate detected!');
  },

  logError: async function (error) {
    let currentTime = Date.now();

    await this.appendErrorToFile(`${currentTime} - Error: ${error}`);

    this.errorTimestamps.push(currentTime);
    this.errorTimestamps = this.errorTimestamps.filter(
      (timestamp) => currentTime - timestamp <= 60000
    );

    console.log('errorTimestamps length:', this.errorTimestamps.length);
    console.log('lastEmailSentTime:', this.lastEmailSentTime);

    if (
      this.errorTimestamps.length > 10 &&
      (!this.lastEmailSentTime || currentTime - this.lastEmailSentTime >= 60000)
    ) {
      console.log('Trying to send email notification...');
      this.sendEmailNotification();
      this.lastEmailSentTime = currentTime;
    }
  },

  reset: function () {
    this.errorTimestamps = [];
    this.lastEmailSentTime = null;
  },
};
