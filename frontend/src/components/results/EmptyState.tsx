import React from 'react'

import { Card, CardContent } from '../ui/card'

export function EmptyState(): React.JSX.Element {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">No Results Yet</h2>
        <p className="text-gray-600 mb-6">
          Complete your first assessment to see your results here.
        </p>
      </CardContent>
    </Card>
  )
}