export class AbortControllerManager {
    private controller: AbortController | null = null;
  
    public createController() {
      this.controller = new AbortController();
      return this.controller.signal;
    }
  
    public abort() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    }
  }