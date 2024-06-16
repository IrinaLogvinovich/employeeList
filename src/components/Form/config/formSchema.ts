import { z } from 'zod';

const currentYear = new Date().getFullYear();
const maxYear = currentYear - 100; //оптимистично

export const employeeFormSchema = z.object({
  name: z
    .string({ message: 'Поле не должно быть пустым' })
    .trim()
    .min(3, { message: 'В поле должно быть больше 3х символов' }),
  
  role: z
    .literal('driver', { message: 'Выберите должность' })
    .or(z.literal('cook', { message: 'Выберите должность' }))
    .or(z.literal('waiter', { message: 'Выберите должность' })),
  
    isArchive: z.boolean(),
  
  phone: z.string({ message: 'Заполните телефон' }).refine(
    (data) => {
      const phone = data.slice(2).replace(/[^0-9]/g, '');
      return phone.length === 10;
    },
    { message: 'Заполните телефон' }
  ),
  
  birthday: z
    .string({ message: 'Заполните дату рождения' })
    .superRefine((data, ctx) => {
      const birthday = data.replace(/[^0-9]/g, '');

      if (birthday.length !== 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Заполните дату рождения',
        });
      }

      if (Number(data.split('.')[0]) > 31) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `В месяце не более 31 дня`,
        });
      }

      if (Number(data.split('.')[1]) > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `В году не более 12 месяцев`,
        });
      }

      if (
        Number(data.split('.')[2]) < maxYear ||
        Number(data.split('.')[2]) > currentYear
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Неверный год рождения`,
        });
      }
    }),
});

export type TEmployeeFormSchema = z.infer<typeof employeeFormSchema>;
