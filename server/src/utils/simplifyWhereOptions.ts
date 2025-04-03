import { Op, WhereOptions } from 'sequelize';

type extraFieldType = 'category' | 'book' | 'user' | 'none';

const simplifyWhereOptions = (
  where: WhereOptions | undefined,
  extraField: extraFieldType = 'none'
): string => {
  if (!where) return '{}';
  const simplified: Record<string, string> = {};

  for (const [key, value] of Object.entries(where)) {
    const field = key === 'name' ? extraField : key;
    if (value && typeof value === 'object') {
      if (Op.iLike in value) {
        simplified[field] = value[Op.iLike] as string;
      } else {
        simplified[field] = String(value);
      }
    } else {
      simplified[field] = String(value);
    }
  }

  return JSON.stringify(simplified);
};

export default simplifyWhereOptions;
