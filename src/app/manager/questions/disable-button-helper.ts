import { DisableButton } from 'src/app/models';

export const disableBtnObjFactory = (
  disable = true,
  excludeId?: string
): DisableButton => {
  return {
    excludeId,
    disable,
  };
};
