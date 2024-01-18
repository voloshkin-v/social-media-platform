import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { filterSchema } from '@/lib/schemas';
import { levels, countries } from '@/lib/constants';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import RadioField from '../forms/RadioField';
import SelectField from '../forms/SelectField';
import { Separator } from '@/components/ui/separator';

export type FilterValues = z.infer<typeof filterSchema>;

const Filters = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [open, setOpen] = useState(false);

	const form = useForm<FilterValues>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			gender: (searchParams.get('gender') as FilterValues['gender']) || '',
			languageLevel: searchParams.get('languageLevel') || '',
			country: searchParams.get('country') || '',
			age: [14, 65],
		},
	});

	const onSubmit = (values: FilterValues) => {
		const { gender, languageLevel, country, age } = values;

		if (gender) {
			searchParams.set('gender', gender);
		}

		if (languageLevel) {
			searchParams.set('languageLevel', languageLevel);
		}

		if (country) {
			searchParams.set('country', country);
		}

		if (age.length) {
			searchParams.set('minAge', age[0].toString());
			searchParams.set('maxAge', age[1].toString());
		}

		setOpen(false);
		setSearchParams(searchParams);
	};

	const handleReset = () => {
		searchParams.delete('gender');
		searchParams.delete('languageLevel');
		searchParams.delete('country');
		searchParams.delete('minAge');
		searchParams.delete('maxAge');

		form.reset({
			gender: '',
			languageLevel: '',
			country: '',
			age: [14, 65],
		});

		setSearchParams(searchParams);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Filters</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Find like-minded people</DialogTitle>
				</DialogHeader>

				<Separator className="mb-4" />

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<RadioField<FilterValues, FilterValues['gender']>
							form={form}
							name="gender"
							data={['Male', 'Female']}
							label="Select gender"
						/>

						<SelectField
							form={form}
							name="languageLevel"
							label="Select minimum level of English"
							data={levels}
						/>
						<SelectField form={form} name="country" label="Select country" data={countries} />ц

						<FormField
							control={form.control}
							name="age"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select age</FormLabel>

									<Slider
										range
										max={65}
										min={14}
										allowCross={false}
										defaultValue={[14, 65]}
										{...field}
									/>

									<div className="flex justify-between">
										<span className="text-xs">Min: {field.value[0]}</span>
										<span className="text-xs">Max: {field.value[1]}</span>
									</div>

									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className="gap-4">
							<Button variant="secondary" type="reset" onClick={handleReset}>
								Reset
							</Button>
							<Button disabled={!form.formState.isDirty} type="submit">
								Apply
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default Filters;
