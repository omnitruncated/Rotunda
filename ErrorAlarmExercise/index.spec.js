import { alarmSystem } from './index.js';

jest.mock('./index.js', () => ({
  alarmSystem: {
    ...jest.requireActual('./index.js').alarmSystem,
    appendErrorToFile: jest.fn(),
    sendEmailNotification: jest.fn(),
  },
}));

describe('Alarm System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date().getTime());
    alarmSystem.reset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should log errors without sending email for less than 10 errors', async () => {
    for (let i = 0; i < 9; i++) {
      alarmSystem.logError(`Error ${i}`);
    }

    expect(alarmSystem.appendErrorToFile).toHaveBeenCalledTimes(9);
    expect(alarmSystem.sendEmailNotification).not.toHaveBeenCalled();
  });

  it('should send an email notification when more than 10 errors occur in a minute', async () => {
    for (let i = 0; i < 12; i++) {
      await alarmSystem.logError(`Error ${i}`);
    }

    expect(alarmSystem.appendErrorToFile).toHaveBeenCalledTimes(12);
    expect(alarmSystem.sendEmailNotification).toHaveBeenCalledTimes(1);
  });

  it('should not send more than one email notification per minute', async () => {
    for (let i = 0; i < 11; i++) {
      await alarmSystem.logError(`Error ${i}`);
    }

    expect(alarmSystem.appendErrorToFile).toHaveBeenCalledTimes(11);
    expect(alarmSystem.sendEmailNotification).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(61000);

    for (let i = 11; i < 22; i++) {
      await alarmSystem.logError(`Error ${i}`);
      jest.advanceTimersByTime(1000); 
    }

    expect(alarmSystem.appendErrorToFile).toHaveBeenCalledTimes(22);
    expect(alarmSystem.sendEmailNotification).toHaveBeenCalledTimes(2);
  });
});
