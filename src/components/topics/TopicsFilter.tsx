
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TopicsFilterProps {
  filters: {
    category: string;
    deadline: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string;
    deadline: string;
  }>>;
}

const TopicsFilter = ({ filters, setFilters }: TopicsFilterProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Categories</h3>
            <RadioGroup 
              value={filters.category} 
              onValueChange={(value) => setFilters({...filters, category: value})}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Categories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="computer-science" id="computer-science" />
                <Label htmlFor="computer-science">Computer Science</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biology" id="biology" />
                <Label htmlFor="biology">Biology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="psychology" id="psychology" />
                <Label htmlFor="psychology">Psychology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="engineering" id="engineering" />
                <Label htmlFor="engineering">Engineering</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Deadline</h3>
            <RadioGroup 
              value={filters.deadline} 
              onValueChange={(value) => setFilters({...filters, deadline: value})}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="deadline-all" />
                <Label htmlFor="deadline-all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="this-week" id="this-week" />
                <Label htmlFor="this-week">This Week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="this-month" id="this-month" />
                <Label htmlFor="this-month">This Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="next-month" id="next-month" />
                <Label htmlFor="next-month">Next Month</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopicsFilter;
