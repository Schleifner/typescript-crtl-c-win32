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
      const stdStream = process.stdout;
      if (stdStream === null) {
        fail(new Error("fail to start executable!"));
      } else {
        stdStream.on("close", () => {
          resolve();
        });
        stdStream.on("error", (error) => {
          fail(error);
        });
        stdStream.on("readable", (data: string) => {
          readable(data);
        });
      }
    });
  }
}

export const controlCEventSender = new ControlCEventSender();
