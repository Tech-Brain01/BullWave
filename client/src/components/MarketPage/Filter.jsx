import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Search, Filter as FilterIcon, ArrowRight } from 'lucide-react';

const Filter = () => {
  const sectors = [
    "All Sectors",
    "Banking",
    "IT Services",
    "Oil & Gas",
    "Automobiles",
    "Pharmaceuticals",
    "FMCG",
    "Metals & Mining",
    "Telecommunications",
    "Financial Services",
    "Real Estate",
    "Power",
    "Textiles",
    "Chemicals",
    "Consumer Durables",
    "Media & Entertainment",
    "Infrastructure"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-8">
        <h3 className="text-2xl font-bold mb-6">Explore All Stocks</h3>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search stocks..." 
                className="pl-10 bg-background/50"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-background/50">
                <FilterIcon className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, '-')}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-background/50">
                <SelectValue placeholder="Market Cap" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Caps</SelectItem>
                <SelectItem value="large">Large Cap</SelectItem>
                <SelectItem value="mid">Mid Cap</SelectItem>
                <SelectItem value="small">Small Cap</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-background/50">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stocks</SelectItem>
                <SelectItem value="gainers">Top Gainers</SelectItem>
                <SelectItem value="losers">Top Losers</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
              </SelectContent>
            </Select>
            
            <Button asChild variant="premium">
                    <Link to="/stocks">
                      View Full List
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Filter;