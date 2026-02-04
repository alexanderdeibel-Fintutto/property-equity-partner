import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EKCrossSellBanner() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Tilgungsrechner</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Planen Sie Ihre komplette Finanzierung und berechnen Sie verschiedene Tilgungsszenarien.
            </p>
            <Link to="/">
              <Button variant="link" className="h-auto p-0 mt-2 text-primary text-xs">
                Zum Tilgungsrechner
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
