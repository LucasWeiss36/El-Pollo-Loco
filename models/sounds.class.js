
class Sounds extends Audio {


    static allSoundObjects = []



    constructor(src) {
        super(src);
        Sounds.allSoundObjects.push(this)
    }
}