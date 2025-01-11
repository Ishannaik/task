import { Calendar, Plus } from 'lucide-react'
import { format, startOfDay, isBefore } from 'date-fns'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import type { NewTask } from '@/types/task'

interface TaskFormProps {
  newTask: NewTask
  onTaskChange: (task: NewTask) => void
  onSubmit: () => void
}

export function TaskForm({ newTask, onTaskChange, onSubmit }: TaskFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isTitleValid = newTask.title.trim().length > 0;
  const isDescriptionValid = newTask.description?.trim().length > 0;

  // Updated date validation logic
  const isDueDateValid = (() => {
    if (!newTask.dueDate) return false;
    const today = startOfDay(new Date()); // Get start of current day
    const dueDate = startOfDay(new Date(newTask.dueDate)); // Get start of due date
    return !isBefore(dueDate, today); // Valid if due date is today or later
  })();

  const handleSubmit = () => {
    setFormSubmitted(true);
    if (isTitleValid && isDescriptionValid && isDueDateValid) {
      onSubmit();
    }
  };

  const isFormValid = isTitleValid && isDescriptionValid && isDueDateValid;

  // Disable past dates in calendar
  const disabledDates = {
    before: startOfDay(new Date())
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6 space-y-4 border border-border">
      <h2 className="text-xl font-semibold text-foreground">Add New Task</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            value={newTask.title}
            onChange={(e) =>
              onTaskChange({ ...newTask, title: e.target.value })
            }
            className={`bg-background text-foreground ${!isTitleValid && formSubmitted ? 'border-red-500' : ''
              }`}
          />
          {formSubmitted && !isTitleValid && (
            <p className="text-red-500 text-sm">Title is required.</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Due Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal bg-background text-foreground ${!isDueDateValid && formSubmitted ? 'border-red-500' : ''
                  }`}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {newTask.dueDate ? (
                  format(newTask.dueDate, 'dd-MM-yyyy')
                ) : (
                  <span>dd-mm-yyyy</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card">
              <CalendarComponent
                mode="single"
                selected={newTask.dueDate}
                onSelect={(date) =>
                  onTaskChange({ ...newTask, dueDate: date || new Date() })
                }
                disabled={disabledDates}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {formSubmitted && !isDueDateValid && (
            <p className="text-red-500 text-sm">
              Please select today or a future date
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Description</label>
        <Textarea
          value={newTask.description || ''}
          onChange={(e) =>
            onTaskChange({ ...newTask, description: e.target.value })
          }
          className={`bg-background text-foreground ${!isDescriptionValid && formSubmitted ? 'border-red-500' : ''
            }`}
        />
        {formSubmitted && !isDescriptionValid && (
          <p className="text-red-500 text-sm">Description is required.</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Priority</label>
          <Select
            value={newTask.priority}
            onValueChange={(value: "low" | "medium" | "high") =>
              onTaskChange({ ...newTask, priority: value })
            }
          >
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </div>
    </div>
  );
}