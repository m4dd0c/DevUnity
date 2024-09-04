class DevUnityError extends Error {
  public status;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
export default DevUnityError;
