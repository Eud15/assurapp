"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, CreditCard, TrendingUp, AlertTriangle, Euro, UserCheck, UserX, Clock, Shield } from "lucide-react"

export default function DashboardPage() {
  // Mock data - in real app this would come from API
  const stats = {
    totalInsured: 1247,
    principalInsured: 892,
    dependents: 355,
    pendingRequests: 12,
    contractValue: 245000,
    consumptionRate: 68,
    upcomingPayments: 3,
    activeAlerts: 5,
  }

  const alerts = [
    {
      id: 1,
      type: "age",
      title: "Limite d'âge atteinte",
      description: "3 ayants droit atteignent la limite de 21 ans ce mois-ci",
      priority: "high",
    },
    {
      id: 2,
      type: "payment",
      title: "Échéance proche",
      description: "Paiement de 15 240€ dû dans 5 jours",
      priority: "medium",
    },
    {
      id: 3,
      type: "fraud",
      title: "Activité suspecte détectée",
      description: "Consommation inhabituelle détectée pour 2 assurés",
      priority: "high",
    },
  ]

  const recentActivity = [
    { type: "incorporation", name: "Marie Dubois", date: "Il y a 2h", status: "pending" },
    { type: "suspension", name: "Pierre Martin", date: "Il y a 4h", status: "approved" },
    { type: "withdrawal", name: "Sophie Laurent", date: "Hier", status: "approved" },
    { type: "incorporation", name: "Jean Moreau", date: "Hier", status: "rejected" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de votre portefeuille d'assurance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-card">
            Dernière mise à jour: Il y a 5 min
          </Badge>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Alertes importantes</h2>
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={alert.priority === "high" ? "border-destructive" : "border-accent"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>{alert.description}</span>
                  <Button size="sm" variant="outline">
                    Voir détails
                  </Button>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assurés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalInsured.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.principalInsured} principaux • {stats.dependents} ayants droit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Contractuelle</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.contractValue.toLocaleString()}€</div>
            <p className="text-xs text-muted-foreground">Primes annuelles TTC</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Consommation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.consumptionRate}%</div>
            <Progress value={stats.consumptionRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Par rapport à la prime nette</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes en Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Incorporations, retraits, suspensions</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>Dernières demandes et modifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.type === "incorporation" && <UserCheck className="w-4 h-4 text-primary" />}
                      {activity.type === "withdrawal" && <UserX className="w-4 h-4 text-destructive" />}
                      {activity.type === "suspension" && <Clock className="w-4 h-4 text-accent" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {activity.type === "incorporation" && "Incorporation"}
                        {activity.type === "withdrawal" && "Retrait"}
                        {activity.type === "suspension" && "Suspension"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        activity.status === "approved"
                          ? "default"
                          : activity.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {activity.status === "approved" && "Approuvé"}
                      {activity.status === "pending" && "En attente"}
                      {activity.status === "rejected" && "Refusé"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full bg-transparent">
                Voir toute l'activité
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Nouvelle incorporation
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Consulter échéancier
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Demande d'accord
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Prochaines Échéances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Prime mensuelle</p>
                    <p className="text-xs text-muted-foreground">15 janvier 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">15 240€</p>
                    <Badge variant="secondary" className="text-xs">
                      Dans 5 jours
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Régularisation</p>
                    <p className="text-xs text-muted-foreground">28 janvier 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">3 890€</p>
                    <Badge variant="outline" className="text-xs">
                      Dans 18 jours
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
