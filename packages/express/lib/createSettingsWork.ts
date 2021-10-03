import {
  SettingsWork, SettingsWorkAction, SettingsWorkPayload, WORK_TYPE
} from './Work';

export default function createSettingsWork(action: SettingsWorkAction, payload: SettingsWorkPayload): SettingsWork {
  return {
    type: WORK_TYPE.SETTINGS,
    action,
    payload
  };
}
