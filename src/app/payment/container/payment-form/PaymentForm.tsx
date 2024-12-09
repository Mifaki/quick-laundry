'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MachineCard from '@/shared/container/machine-card/MachineCard';
import { Button } from '@/shared/container/ui/button';
import { Calendar } from '@/shared/container/ui/calendar';
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
import { ISessionDetail, ISessionsResponseData } from '@/shared/models/sessionInterface';
import { useToast } from '@/shared/usecase/use-toast';
import { UserSchema } from '../../models/schema';

interface PaymentFormProps {
  data: ISessionsResponseData;
  onSubmit: (values: z.infer<typeof UserSchema>) => Promise<void>;
}

export default function PaymentForm({ data, onSubmit }: PaymentFormProps) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [availableMachines, setAvailableMachines] = useState<ISessionDetail[]>([]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      date: undefined,
      session: undefined,
      laundryMachineId: undefined,
    },
  });

  const selectedDate = form.watch('date');
  const selectedSession = form.watch('session');

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'dd, MM, yyyy');

      if (data.dates.includes(formattedDate)) {
        const timeSlotsForDate = data.timeSlots?.[formattedDate] ?? {};
        const timeSlots = Object.keys(timeSlotsForDate);
        setAvailableTimeSlots(timeSlots);
      } else {
        setAvailableTimeSlots([]);
        form.setValue('session', '');
      }
    }
  }, [selectedDate, data.dates, data.timeSlots, form]);

  useEffect(() => {
    if (selectedDate && selectedSession) {
      const formattedDate = format(selectedDate, 'dd, MM, yyyy');
      const machinesForSlot = data.timeSlots[formattedDate]?.[selectedSession] || [];
      const availableMachinesForSlot = machinesForSlot.filter((machine) => !machine.isBooked);

      setAvailableMachines(availableMachinesForSlot);
    } else {
      setAvailableMachines([]);
    }
  }, [selectedDate, selectedSession, data.timeSlots]);

  const handleSubmit = async (values: z.infer<typeof UserSchema>) => {
    toast({
      title: 'Membuat Pesanan anda...',
      description: 'Mohon tunggun sebentar, kami sedang memproses pesanan anda',
      duration: 2000,
    });

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting order', error);
      toast({
        title: 'Error',
        description: 'Terjadi error saat membuat pesanan anda, silahkan coba kembali',
        variant: 'destructive',
      });
    }
  };

  const isDateDisabled = (date: Date) => {
    const formattedDate = format(date, 'dd, MM, yyyy');
    return !data.dates.includes(formattedDate);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
                        placeholder="john doe"
                        type="text"
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
                        placeholder="0881021212"
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
                          disabled={isDateDisabled}
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
                      value={field.value}
                      disabled={!selectedDate}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jam" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimeSlots.map((timeSlot) => (
                          <SelectItem
                            key={timeSlot}
                            value={timeSlot}
                          >
                            {timeSlot}
                          </SelectItem>
                        ))}
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
                value={field.value}
                disabled={!selectedDate || !selectedSession}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mesin laundry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableMachines
                    .filter((machine) => !machine.isBooked)
                    .map((machine) => (
                      <SelectItem
                        key={machine.machineId}
                        value={machine.machineId.toString()}
                      >
                        {machine.machineName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-4">
            {availableMachines.map((machine) => (
              <MachineCard
                key={machine.machineId}
                id={machine.machineId.toString()}
                state={machine.isBooked ? 'not_available' : 'available'}
                title={machine.machineName}
                sessionStart={machine.sessionStart}
                sessionEnd={machine.sessionEnd}
              />
            ))}
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
