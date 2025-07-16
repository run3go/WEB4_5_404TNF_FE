import z from 'zod/v3';

export const petProfileSchema = z
  .object({
    image: z.nullable(z.string()),
    name: z
      .string()
      .trim()
      .min(1, '이름은 최소 1자 이상이어야 합니다')
      .max(10, '이름은 10자리 이하이어야 합니다')
      .regex(/^[a-zA-Z가-힣]+$/, '이름은 오직 영어와 한글만 입력 가능합니다'),
    breed: z.enum([
      'BEAGLE',
      'BICHON_FRISE',
      'BORDER_COLLIE',
      'BOXER',
      'BULLDOG',
      'CHIHUAHUA',
      'COCKER_SPANIEL',
      'DACHSHUND',
      'DOBERMAN',
      'FRENCH_BULLDOG',
      'GERMAN_SHEPHERD',
      'GOLDEN_RETRIEVER',
      'GREAT_DANE',
      'HUSKY',
      'JACK_RUSSELL',
      'LABRADOR',
      'MALTESE',
      'PAPILLON',
      'POMERANIAN',
      'POODLE',
      'PUG',
      'SAMOYED',
      'SHIBA_INU',
      'SHIH_TZU',
      'WELSH_CORGI',
      'YORKSHIRE_TERRIER',
      'MIX',
    ]),
    metday: z.string(),
    birthday: z.string(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    isNeutered: z.enum(['true', 'false']),
    sex: z.enum(['true', 'false']),
    registNumber: z.string().trim().length(15, '등록번호는 15자이어야 합니다'),
    weight: z
      .number()
      .min(1, '몸무게는 1kg 이상이어야 합니다')
      .max(200, '몸무게는 200kg 이하이어야 합니다'),
  })
  .refine(
    (data) => {
      console.log(data);
      const birthday = new Date(data.birthday);
      const metday = new Date(data.metday);
      console.log(birthday <= metday);
      return birthday <= metday;
    },
    {
      message: '태어난 날은 만난 날짜보다 이전이어야 합니다',
      path: ['birthday'],
    },
  );
