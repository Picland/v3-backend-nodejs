interface StringValidator {
  isAcceptable (s: string): boolean
}

let lettersRegexp = /^[A-Za-z]+$/
let numberRegexp = /^[0-9]+$/

class LettersOnlyValidator implements StringValidator {
  isAcceptable (s: string) {
    return lettersRegexp.test(s)
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable (s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}
