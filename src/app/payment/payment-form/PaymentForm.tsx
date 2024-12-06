'use client';

import { Button } from '@/shared/container/ui/button';
import { Calendar } from '@/shared/container/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MachineCard from '@/shared/container/machine-card/MachineCard';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/container/ui/form';
import { Input } from '@/shared/container/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/container/ui/popover';
import { ScrollArea } from '@/shared/container/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/container/ui/select';
import { Separator } from '@/shared/container/ui/separator';
import { toast } from '@/shared/usecase/use-toast';
import { UserSchema } from '../models/schema';

export default function PaymentForm() {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof UserSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error('Form submission error', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8"
      >
        <div>
          <h2 className="mb-4 mt-10 text-xl font-semibold">Identitas Pemesan</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        type=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="mb-4 text-xl font-semibold">Detail Pemesanan</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="session"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jam</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="laundryMachineId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Mesin Laundry</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-4">
            <MachineCard
              id="Test"
              state="available"
              title="Mesin Laundry 1"
              sessionStart="17:00"
              sessionEnd="18:00"
            />
            <MachineCard
              id="Test"
              state="available"
              title="Mesin Laundry 1"
              sessionStart="17:00"
              sessionEnd="18:00"
            />
            <MachineCard
              id="Test"
              state="available"
              title="Mesin Laundry 1"
              sessionStart="17:00"
              sessionEnd="18:00"
            />
            <MachineCard
              id="Test"
              state="available"
              title="Mesin Laundry 1"
              sessionStart="17:00"
              sessionEnd="18:00"
            />
          </div>
        </ScrollArea>

        <Separator />

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="ml-auto w-1/3"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
