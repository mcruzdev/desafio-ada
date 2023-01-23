export class StringValidator {
  static isNullOrEmpty(v?: string) {
    return !v || v.trim() == "";
  }
}
