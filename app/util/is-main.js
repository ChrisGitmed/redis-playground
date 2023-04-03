import { fileURLToPath } from 'url';
import { resolve } from 'path';

const isMain = (moduleUrl) => {
  const modulePath = resolve(fileURLToPath(moduleUrl));
  const mainScriptPath = resolve(process.argv[1]);
  const scriptPathEnd = mainScriptPath.split('/').slice(-3).join('/');
  return (modulePath === mainScriptPath) ||
    scriptPathEnd === 'pm2/lib/ProcessContainerFork.js'; // Hacky way of saying 'If PM2 is calling this then it is main'
};

export { isMain };

