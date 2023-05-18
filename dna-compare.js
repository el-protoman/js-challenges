// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,

    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },

    compareDNA(otherOrganism) {
      let commonBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          commonBases++;
        }
      }
      const percentage = (commonBases / this.dna.length) * 100;
      //console.log(`specimen #${this.specimenNum} and specimen #${otherOrganism.specimenNum} have ${percentage}% DNA in common.`);

    return percentage
    },

    willLikelySurvive() {
      const cgBases = this.dna.filter(base => base === 'C' || base === 'G');
      const percentage = (cgBases.length / this.dna.length) * 100;
      return percentage >= 60;
    },

    complementStrand() {
      const complement = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            complement.push('T');
            break;
          case 'T':
            complement.push('A');
            break;
          case 'C':
            complement.push('G');
            break;
          case 'G':
            complement.push('C');
            break;
        }
      }
      return complement;
    }
  };
};

const pAequorInstances = [];

for (let i = 1; i <= 30; i++) {
  let organism = pAequorFactory(i, mockUpStrand());
  while (!organism.willLikelySurvive()) {
    organism = pAequorFactory(i, mockUpStrand());
  }
  pAequorInstances.push(organism);
}

console.log(pAequorInstances);

let maxPercentage = 0;
let mostRelatedPair= [];

for (let i = 0; i < pAequorInstances.length; i++) {
  for (let j = i + 1; j < pAequorInstances.length; j++) {
    const organism1 = pAequorInstances[i];
    const organism2 = pAequorInstances[j];
    const percentage = organism1.compareDNA(organism2);
    if (percentage > maxPercentage) {
      maxPercentage = percentage;
      console.log('high% organism',organism1)
      mostRelatedPair = [organism1, organism2];
    }
  }
}

console.log(
  `The most related pair is specimen #${mostRelatedPair[0].specimenNum} and specimen #${mostRelatedPair[1].specimenNum} with ${maxPercentage}% DNA in common.`
);
