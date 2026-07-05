import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Security & Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your password and communication preferences.</p>
      </div>

      <div className="grid gap-8 max-w-xl">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Change Password</h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" />
            </div>
            <Button>Update Password</Button>
          </div>
        </section>

        <section className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold border-b pb-2">Communication Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-start gap-3 p-4 border rounded-xl hover:bg-muted/30 cursor-pointer transition-colors">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
              <div>
                <p className="font-medium text-sm text-foreground">Order Updates</p>
                <p className="text-sm text-muted-foreground">Receive SMS and email notifications about your order status.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-4 border rounded-xl hover:bg-muted/30 cursor-pointer transition-colors">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <div>
                <p className="font-medium text-sm text-foreground">Promotions & News</p>
                <p className="text-sm text-muted-foreground">Get exclusive offers, product announcements, and style tips.</p>
              </div>
            </label>
            <Button variant="outline">Save Preferences</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
