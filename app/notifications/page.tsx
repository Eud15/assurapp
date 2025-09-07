"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  AlertTriangle,
  Clock,
  Shield,
  CreditCard,
  Users,
  Settings,
  Check,
  Mail,
  MessageSquare,
  Smartphone,
  Calendar,
  TrendingUp,
} from "lucide-react"

export default function NotificationsPage() {
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    whatsapp: true,
    ageAlerts: true,
    paymentAlerts: true,
    fraudAlerts: true,
    contractAlerts: true,
    ageThreshold: 30, // jours avant limite d'âge
    paymentThreshold: 7, // jours avant échéance
    contractThreshold: 60, // jours avant fin de contrat
  })

  // Mock data - in real app this would come from API
  const notifications = [
    {
      id: 1,
      type: "age",
      priority: "high",
      title: "Limite d'âge approchée",
      message: "Lucas Dupont (20 ans) atteindra la limite d'âge dans 30 jours",
      timestamp: "2025-01-10T09:30:00Z",
      isRead: false,
      actionRequired: true,
      relatedEntity: "Lucas Dupont",
      details: {
        currentAge: 20,
        ageLimit: 21,
        daysRemaining: 30,
        family: "Famille Dupont",
      },
    },
    {
      id: 2,
      type: "payment",
      priority: "high",
      title: "Échéance de paiement",
      message: "Paiement de 20 416,67€ dû dans 5 jours",
      timestamp: "2025-01-10T08:15:00Z",
      isRead: false,
      actionRequired: true,
      relatedEntity: "Contrat CTR-2024-001247",
      details: {
        amount: 20416.67,
        dueDate: "2025-01-15",
        daysRemaining: 5,
        type: "Prime mensuelle",
      },
    },
    {
      id: 3,
      type: "fraud",
      priority: "high",
      title: "Activité suspecte détectée",
      message: "Consommation inhabituelle pour Marie Martin (3x la moyenne)",
      timestamp: "2025-01-10T07:45:00Z",
      isRead: true,
      actionRequired: true,
      relatedEntity: "Marie Martin",
      details: {
        consumption: 4500,
        average: 1500,
        period: "Décembre 2024",
        anomalyType: "Consommation excessive",
      },
    },
    {
      id: 4,
      type: "contract",
      priority: "medium",
      title: "Renouvellement de contrat",
      message: "Le contrat CTR-2024-001247 arrive à échéance dans 11 mois",
      timestamp: "2025-01-09T16:20:00Z",
      isRead: true,
      actionRequired: false,
      relatedEntity: "Contrat CTR-2024-001247",
      details: {
        contractNumber: "CTR-2024-001247",
        expiryDate: "2024-12-31",
        renewalDate: "2025-01-01",
        monthsRemaining: 11,
      },
    },
    {
      id: 5,
      type: "age",
      priority: "medium",
      title: "Limite d'âge approchée",
      message: "Sophie Martin (58 ans) atteindra la limite d'âge dans 2 ans",
      timestamp: "2025-01-09T14:10:00Z",
      isRead: true,
      actionRequired: false,
      relatedEntity: "Sophie Martin",
      details: {
        currentAge: 58,
        ageLimit: 60,
        yearsRemaining: 2,
        family: "Famille Martin",
      },
    },
  ]

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.isRead).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "age":
        return <Users className="w-4 h-4" />
      case "payment":
        return <CreditCard className="w-4 h-4" />
      case "fraud":
        return <Shield className="w-4 h-4" />
      case "contract":
        return <Calendar className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-accent"
      case "low":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const markAsRead = (notificationId: number) => {
    // In real app, this would update the backend
    console.log(`Marking notification ${notificationId} as read`)
  }

  const markAllAsRead = () => {
    // In real app, this would update the backend
    console.log("Marking all notifications as read")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications & Alertes</h1>
          <p className="text-muted-foreground">Centre de notifications en temps réel</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsSettingsDialogOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Tout marquer lu
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{notifications.length}</p>
                <p className="text-xs text-muted-foreground">Total notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{highPriorityCount}</p>
                <p className="text-xs text-muted-foreground">Priorité haute</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">{unreadCount}</p>
                <p className="text-xs text-muted-foreground">Non lues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">
                  {notifications.filter((n) => n.actionRequired).length}
                </p>
                <p className="text-xs text-muted-foreground">Action requise</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Non lues ({unreadCount})</TabsTrigger>
          <TabsTrigger value="high">Priorité haute ({highPriorityCount})</TabsTrigger>
          <TabsTrigger value="action">Action requise</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les Notifications</CardTitle>
              <CardDescription>Historique complet des alertes et notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      notification.isRead ? "bg-muted/30" : "bg-card border-primary/20"
                    }`}
                    onClick={() => setSelectedNotification(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`mt-1 ${getPriorityColor(notification.priority)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className={`font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h4>
                            <Badge
                              variant={
                                notification.priority === "high"
                                  ? "destructive"
                                  : notification.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {notification.priority === "high"
                                ? "Urgent"
                                : notification.priority === "medium"
                                  ? "Important"
                                  : "Info"}
                            </Badge>
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs">
                                Action requise
                              </Badge>
                            )}
                          </div>
                          <p
                            className={`text-sm ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{new Date(notification.timestamp).toLocaleString("fr-FR")}</span>
                            <span>{notification.relatedEntity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Notifications Non Lues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter((n) => !n.isRead)
                  .map((notification) => (
                    <div key={notification.id} className="p-4 bg-card border border-primary/20 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`mt-1 ${getPriorityColor(notification.priority)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{notification.title}</h4>
                            <p className="text-sm text-foreground">{notification.message}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString("fr-FR")}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high">
          <Card>
            <CardHeader>
              <CardTitle>Notifications Priorité Haute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter((n) => n.priority === "high")
                  .map((notification) => (
                    <div key={notification.id} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-destructive mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{notification.title}</h4>
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleString("fr-FR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="action">
          <Card>
            <CardHeader>
              <CardTitle>Action Requise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter((n) => n.actionRequired)
                  .map((notification) => (
                    <div key={notification.id} className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-accent mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{notification.title}</h4>
                            <p className="text-sm text-foreground">{notification.message}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString("fr-FR")}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Traiter
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Paramètres de Notification</DialogTitle>
            <DialogDescription>Configurez vos préférences de notification et d'alerte</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Notification Channels */}
            <div>
              <h4 className="font-medium mb-4">Canaux de Notification</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="email-notifications">Email</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les alertes par email</p>
                    </div>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="sms-notifications">SMS</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les alertes par SMS</p>
                    </div>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, sms: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="whatsapp-notifications">WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les alertes via WhatsApp</p>
                    </div>
                  </div>
                  <Switch
                    id="whatsapp-notifications"
                    checked={notificationSettings.whatsapp}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, whatsapp: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Alert Types */}
            <div>
              <h4 className="font-medium mb-4">Types d'Alertes</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="age-alerts">Alertes d'âge</Label>
                    <p className="text-sm text-muted-foreground">Limites d'âge approchées</p>
                  </div>
                  <Switch
                    id="age-alerts"
                    checked={notificationSettings.ageAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, ageAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-alerts">Alertes de paiement</Label>
                    <p className="text-sm text-muted-foreground">Échéances et retards</p>
                  </div>
                  <Switch
                    id="payment-alerts"
                    checked={notificationSettings.paymentAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, paymentAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fraud-alerts">Alertes de fraude</Label>
                    <p className="text-sm text-muted-foreground">Activités suspectes</p>
                  </div>
                  <Switch
                    id="fraud-alerts"
                    checked={notificationSettings.fraudAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, fraudAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="contract-alerts">Alertes contractuelles</Label>
                    <p className="text-sm text-muted-foreground">Renouvellements et fins de contrat</p>
                  </div>
                  <Switch
                    id="contract-alerts"
                    checked={notificationSettings.contractAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, contractAlerts: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Thresholds */}
            <div>
              <h4 className="font-medium mb-4">Seuils d'Alerte</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age-threshold">Limite d'âge (jours avant)</Label>
                  <Input
                    id="age-threshold"
                    type="number"
                    value={notificationSettings.ageThreshold}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        ageThreshold: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="payment-threshold">Échéance (jours avant)</Label>
                  <Input
                    id="payment-threshold"
                    type="number"
                    value={notificationSettings.paymentThreshold}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        paymentThreshold: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="contract-threshold">Fin de contrat (jours avant)</Label>
                  <Input
                    id="contract-threshold"
                    type="number"
                    value={notificationSettings.contractThreshold}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        contractThreshold: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)} className="flex-1">
                Annuler
              </Button>
              <Button onClick={() => setIsSettingsDialogOpen(false)} className="flex-1">
                Sauvegarder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
