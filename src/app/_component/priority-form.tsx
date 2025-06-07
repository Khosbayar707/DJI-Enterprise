import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
};
const PriorityForm = <T extends FieldValues>({ form }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={'priority' as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Хэр чухал вэ?{' '}
            <span className="text-xs italic">*их тоотой нь хамгийн эхэнд харагдана</span>
          </FormLabel>
          <FormControl>
            <RadioGroup
              {...field}
              row
              value={field.value || 0}
              onChange={(e) => field.onChange(Number(e.target.value))}
              className=" flex justify-center gap-4"
            >
              {[0, 1, 2, 3, 4, 5].map((val) => (
                <FormControlLabel
                  key={val}
                  label={val.toString()}
                  value={val}
                  control={<Radio color="primary" />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default PriorityForm;
