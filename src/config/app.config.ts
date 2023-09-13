interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Farm Manager'],
  tenantName: 'Farm',
  applicationName: 'Farmer app',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage farm profile',
    'Manage purchases',
    'Manage sales',
    'Manage meetings with salespeople',
    'Manage financial statements',
    'Invite or remove Farm Manager',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/73443948-88ac-46b2-8943-da799698c619',
};
