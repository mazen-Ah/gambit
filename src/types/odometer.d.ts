declare module 'odometer' {
  interface OdometerOptions {
    el: HTMLElement;
    format?: string;
    theme?: string;
    value?: number | string;
    duration?: number;
    animation?: string;
  }

  class Odometer {
    constructor(options: OdometerOptions);
    update(value: number | string): void;
    render(): void;
    value: number;
  }

  export default Odometer;
}
