"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Download,
  CreditCard,
  Bell,
} from "lucide-react"

export default function ContractsPage() {
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  })

  // Mock data - in real app this would come from API
  const contractInfo = {
    contractNumber: "CTR-2024-001247",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    renewalDate: "2025-01-01",
    status: "active",
    totalPremium: 245000,
    paidAmount: 183750,
    remainingAmount: 61250,
    consumptionRate: 68,
    netPremium: 220500,
    consumedAmount: 149940,
  }

  const paymentSchedule = [
    {
      id: 1,
      dueDate: "2025-01-15",
      amount: 20416.67,
      type: "Mensuelle",
      status: "pending",
      daysUntilDue: 5,
    },
    {
      id: 2,
      dueDate: "2025-02-15",
      amount: 20416.67,
      type: "Mensuelle",
      status: "scheduled",
      daysUntilDue: 36,
    },
    {
      id: 3,
      dueDate: "2025-03-15",
      amount: 20416.67,
      type: "Mensuelle",
      status: "scheduled",
      daysUntilDue: 64,
    },
  ]

  const paymentHistory = [
    {
      id: 1,
      date: "2024-12-15",
      amount: 20416.67,
      type: "Mensuelle",
      status: "paid",
      method: "Virement",
    },
    {
      id: 2,
      date: "2024-11-15",
      amount: 20416.67,
      type: "Mensuelle",
      status: "paid",
      method: "Virement",
    },
    {
      id: 3,
      date: "2024-10-15",
      amount: 20416.67,
      type: "Mensuelle",
      status: "paid",
      method: "Virement",
    },
    {
      id: 4,
      date: "2024-09-15",
      amount: 20416.67,
      type: "Mensuelle",
      status: "paid",
      method: "Virement",
    },
  ]

  const alerts = [
    {
      id: 1,
      type: "payment",
      title: "Échéance proche",
      description: "Paiement de 20 416,67€ dû dans 5 jours",
      priority: "high",
      date: "2025-01-15",
    },
    {
      id: 2,
      type: "renewal",
      title: "Renouvellement de contrat",
      description: "Le contrat arrive à échéance dans 11 mois",
      priority: "medium",
      date: "2025-01-01",
    },
  ]

  const consumptionPercentage = (contractInfo.consumedAmount / contractInfo.netPremium) * 100

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Suivi Contractuel</h1>
          <p className="text-muted-foreground">Gestion des contrats, paiements et échéances</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsNotificationDialogOpen(true)}>
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Alertes contractuelles</h2>
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={alert.priority === "high" ? "border-destructive" : "border-accent"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>{alert.description}</span>
                  <Badge variant="outline">{alert.date}</Badge>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Contract Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Informations Contractuelles
            </CardTitle>
            <CardDescription>Contrat {contractInfo.contractNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Période de validité</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(contractInfo.startDate).toLocaleDateString("fr-FR")} -{" "}
                      {new Date(contractInfo.endDate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Statut du contrat</Label>
                  <div className="mt-1">
                    <Badge variant="default" className="bg-primary">
                      Actif
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Renouvellement</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(contractInfo.renewalDate).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Prime totale TTC</Label>
                  <p className="text-2xl font-bold text-primary">{contractInfo.totalPremium.toLocaleString()}€</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Montant payé</Label>
                  <p className="text-lg font-semibold text-foreground">{contractInfo.paidAmount.toLocaleString()}€</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Restant à payer</Label>
                  <p className="text-lg font-semibold text-accent">{contractInfo.remainingAmount.toLocaleString()}€</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consumption Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Taux de Consommation
            </CardTitle>
            <CardDescription>Par rapport à la prime nette</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{Math.round(consumptionPercentage)}%</p>
                <p className="text-sm text-muted-foreground">de la prime nette consommée</p>
              </div>

              <Progress value={consumptionPercentage} className="h-3" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prime nette:</span>
                  <span className="font-medium">{contractInfo.netPremium.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consommé:</span>
                  <span className="font-medium text-primary">{contractInfo.consumedAmount.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Disponible:</span>
                  <span className="font-medium text-accent">
                    {(contractInfo.netPremium - contractInfo.consumedAmount).toLocaleString()}€
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Section */}
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Échéancier</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Échéancier des Paiements
              </CardTitle>
              <CardDescription>Prochaines échéances à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date d'échéance</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Délai</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentSchedule.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell className="font-medium">{payment.amount.toLocaleString()}€</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === "pending"
                              ? "destructive"
                              : payment.status === "scheduled"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {payment.status === "pending"
                            ? "À payer"
                            : payment.status === "scheduled"
                              ? "Programmé"
                              : "Payé"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">
                            {payment.daysUntilDue > 0 ? `${payment.daysUntilDue} jours` : "Échu"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment.status === "pending" && (
                          <Button size="sm" variant="outline">
                            <CreditCard className="w-4 h-4 mr-1" />
                            Payer
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Historique des Paiements
              </CardTitle>
              <CardDescription>Paiements effectués</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell className="font-medium">{payment.amount.toLocaleString()}€</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-primary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Payé
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Settings Dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paramètres de Notification</DialogTitle>
            <DialogDescription>
              Configurez vos préférences de notification pour les échéances et fins de contrat
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Canaux de notification</h4>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les alertes par email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les alertes par SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="whatsapp-notifications">WhatsApp</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les alertes via WhatsApp</p>
                </div>
                <Switch
                  id="whatsapp-notifications"
                  checked={notifications.whatsapp}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, whatsapp: checked })}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsNotificationDialogOpen(false)} className="flex-1">
                Annuler
              </Button>
              <Button onClick={() => setIsNotificationDialogOpen(false)} className="flex-1">
                Sauvegarder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
