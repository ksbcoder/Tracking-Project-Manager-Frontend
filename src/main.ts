import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './presentation/core/main/pages/app/app.module';
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
