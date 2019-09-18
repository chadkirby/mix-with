module.exports = mix;

const MIXINS = Symbol(`mixins`);

class Mixer {
  constructor(superclass) {
    this.superclass = superclass;
    this.mixins = superclass[MIXINS] || [];
  }
  with(...mixins) {
    // omit mixins that have already been added to the prototype chain
    mixins = mixins.filter((m) => !this.mixins.includes(m));
    this.mixins.push(...mixins);
    let superclass = mixins.reduce(
      (superc, mixin) => mixin(superc),
      this.superclass
    );
    superclass[MIXINS] = this.mixins;
    return superclass;
  }
}

function mix(superclass = class {}) {
  return new Mixer(superclass);
}
