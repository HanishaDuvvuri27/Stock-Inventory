import { Package } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No itemss found',
  description = 'Try adjusting your search or filters',
}: EmptyStateProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <Package className="h-12 w-12 text-muted-foreground" />
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
