import {
  basketballSkillData,
  basketballPositionUserData,
} from '@/constants/basketballInfoData';

export const mapPositionToKey = (positionValue: string): string | null => {
  const positionItem = basketballPositionUserData.find(
    (item) => item.value === positionValue
  );
  return positionItem ? positionItem.key : null;
};

export const mapSkillToKey = (skillValue: string): string | null => {
  const skillItem = basketballSkillData.find(
    (item) => item.value === skillValue
  );
  return skillItem ? skillItem.key : null;
};
