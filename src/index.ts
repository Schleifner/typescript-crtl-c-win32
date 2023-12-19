import { execFile } from "node:child_process";
import { join } from "node:path";
class ControlCEventSender {
  async sendEvent(pid: string, readable: (data: string) => void = console.log) {
    await new Promise<void>((resolve, fail) => {
      const path = join(
        __dirname,
        "..",
        "resources",
        "ctrl-c-event-sender.exe"
      );
      const process = execFile(path, [pid]);
      process.on("close", (code) => {
        if (code === 0) {
          resolve();
        }
      });
      process.on("error", (error) => {
        fail(error);
      });
    });
  }
}

export const controlCEventSender = new ControlCEventSender();
