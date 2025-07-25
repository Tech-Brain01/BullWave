import { useState } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Calendar } from "../ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/PopOver";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Search, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import 'react-day-picker/dist/style.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState();

  return (
   <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[180px] justify-start text-left font-normal",
                        !dateFilter && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#11131E] border-border shadow-lg" align="start" sideOffset={4}>
                    <Calendar
                      mode='single'
                      selected={dateFilter}
                      onSelect={setDateFilter}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </Card>
          </motion.div>
  );
};

export default SearchBar;
