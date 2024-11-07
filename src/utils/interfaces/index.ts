import { Request } from 'express';
import { IAuthInfo } from '../../modules/auth/auth.types';
import { PLATFORM } from '../../modules/auth/auth.constant';
// import detectMobileFromUserAgent from "../helpers/detectMobileFromUserAgent";

export const deviceInfo = ({ headers: { deviceId, platform } }): { deviceId: string; platform: PLATFORM } => ({
  deviceId: deviceId,
  platform,
});

export const getIdFromRarams = (req: Request): string => req.params.id;
export const getqueriy = ({ query }: Request) => query;
// export const isMobile = (req: Request) => {
//   return detectMobFromUserAgent(req.get('User-Agent'));
// };
export const getBody = ({ body }: Request) => body;
export const getUserInfo = ({ user }: Request): IAuthInfo => user as IAuthInfo;
export const getNameFromParams = (req: Request) => {
  return req.params.name;
};
export const getUTCFromHeader = (req: Request): number =>
  req.headers['x-timezone'] ? Number(req.headers['x-timezoe']) : 0;
