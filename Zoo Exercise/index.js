 class Animal {
  animalSound;
  speak(text) {
    let animalSpeech = text.split(' ');
    for (let i = 0; i <= animalSpeech.length; i++) {
      if (i % 2) {
        animalSpeech.splice(i, 0, this.animalSound);
      }
    }
    animalSpeech = animalSpeech.join(' ');
    console.log(`${animalSpeech}`);
    return animalSpeech;
  }
}

 class Lion extends Animal {
  animalSound = 'roar';
}

 class Tiger extends Animal {
  animalSound = 'grrr';
}

module.exports = { Lion, Tiger };
