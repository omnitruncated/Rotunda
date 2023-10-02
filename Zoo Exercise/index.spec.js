const { Lion, Tiger } = require('./index.js');

describe('Animal behaviors', () => {
  it('should behave like a lion', () => {
    const lion = new Lion();
    expect(lion.speak("I'm a lion")).toEqual("I'm roar a roar lion roar");
  });

  it('should behave like a tiger', () => {
    const tiger = new Tiger();
    expect(tiger.speak('Lions suck')).toEqual('Lions grrr suck grrr');
  });
});
