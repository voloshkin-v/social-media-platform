import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { filterSchema } from '@/lib/schemas';
import GenderField from '../profile/Edit/GenderField';

export type FilterValues = z.infer<typeof filterSchema>;

const Filters = () => {
	const form = useForm<FilterValues>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			country: undefined,
			gender: undefined,
			languageLevel: undefined,
		},
	});

	const onSubmit = (values: FilterValues) => {
		console.log(values);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Filters</Button>
			</DialogTrigger>

			<DialogContent className="gap-8">
				<DialogHeader>
					<DialogTitle>Find</DialogTitle>

					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">Apply</Button>
						</DialogFooter>
					</form>
				</Form>

				{/* <div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input id="username" defaultValue="@peduarte" className="col-span-3" />
					</div>
				</div> */}
			</DialogContent>
		</Dialog>
	);
};

export default Filters;
