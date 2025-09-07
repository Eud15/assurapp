"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Download, Filter, BarChart3, PieChartIcon, Activity, Users, Calendar } from "lucide-react"

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024")
  const [selectedEntity, setSelectedEntity] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data - in real app this would come from API
  const consumptionByCategory = [
    { name: "Consultations", value: 45000, percentage: 35, color: "var(--chart-1)" },
    { name: "Pharmacie", value: 32000, percentage: 25, color: "var(--chart-2)" },
    { name: "Hospitalisation", value: 28000, percentage: 22, color: "var(--chart-3)" },
    { name: "Optique", value: 15000, percentage: 12, color: "var(--chart-4)" },
    { name: "Dentaire", value: 8000, percentage: 6, color: "var(--chart-5)" },
  ]

  const monthlyConsumption = [
    { month: "Jan", consumption: 12500, budget: 15000 },
    { month: "Fév", consumption: 14200, budget: 15000 },
    { month: "Mar", consumption: 13800, budget: 15000 },
    { month: "Avr", consumption: 15600, budget: 15000 },
    { month: "Mai", consumption: 11900, budget: 15000 },
    { month: "Jun", consumption: 16200, budget: 15000 },
    { month: "Jul", consumption: 13400, budget: 15000 },
    { month: "Aoû", consumption: 10800, budget: 15000 },
    { month: "Sep", consumption: 14700, budget: 15000 },
    { month: "Oct", consumption: 15900, budget: 15000 },
    { month: "Nov", consumption: 13200, budget: 15000 },
    { month: "Déc", consumption: 12800, budget: 15000 },
  ]

  const consumptionByFamily = [
    { family: "Direction", members: 8, consumption: 24500, average: 3062 },
    { family: "Ressources Humaines", members: 12, consumption: 18200, average: 1517 },
    { family: "Comptabilité", members: 15, consumption: 22800, average: 1520 },
    { family: "Commercial", members: 25, consumption: 35600, average: 1424 },
    { family: "Production", members: 45, consumption: 52400, average: 1164 },
    { family: "Logistique", members: 18, consumption: 21300, average: 1183 },
  ]

  const movementStats = [
    { type: "Incorporations", count: 24, trend: "+12%", color: "text-primary" },
    { type: "Retraits", count: 8, trend: "-5%", color: "text-destructive" },
    { type: "Suspensions", count: 6, trend: "+2%", color: "text-accent" },
    { type: "Réactivations", count: 4, trend: "+8%", color: "text-primary" },
  ]

  const topConsumers = [
    { name: "Famille Martin", consumption: 8500, members: 4, average: 2125 },
    { name: "Famille Dubois", consumption: 7200, members: 3, average: 2400 },
    { name: "Famille Laurent", consumption: 6800, members: 5, average: 1360 },
    { name: "Famille Bernard", consumption: 6200, members: 2, average: 3100 },
    { name: "Famille Moreau", consumption: 5900, members: 4, average: 1475 },
  ]

  const totalConsumption = consumptionByCategory.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistiques & Rapports</h1>
          <p className="text-muted-foreground">Analyse des consommations et mouvements</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Période</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">Année 2024</SelectItem>
                  <SelectItem value="2023">Année 2023</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Entité</label>
              <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les entités</SelectItem>
                  <SelectItem value="direction">Direction</SelectItem>
                  <SelectItem value="rh">Ressources Humaines</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Catégorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="consultations">Consultations</SelectItem>
                  <SelectItem value="pharmacie">Pharmacie</SelectItem>
                  <SelectItem value="hospitalisation">Hospitalisation</SelectItem>
                  <SelectItem value="optique">Optique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{totalConsumption.toLocaleString()}€</p>
                <p className="text-xs text-muted-foreground">Consommation totale</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">123</p>
                <p className="text-xs text-muted-foreground">Familles assurées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">1,045€</p>
                <p className="text-xs text-muted-foreground">Consommation moyenne</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">42</p>
                <p className="text-xs text-muted-foreground">Mouvements ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="consumption" className="space-y-4">
        <TabsList>
          <TabsTrigger value="consumption">Consommations</TabsTrigger>
          <TabsTrigger value="movements">Mouvements</TabsTrigger>
          <TabsTrigger value="families">Par Famille</TabsTrigger>
        </TabsList>

        <TabsContent value="consumption" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Consumption by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Consommation par Catégorie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={consumptionByCategory}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {consumptionByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value.toLocaleString()}€`, "Montant"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Consumption Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Évolution Mensuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyConsumption}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()}€`, ""]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="consumption"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        name="Consommation"
                      />
                      <Line
                        type="monotone"
                        dataKey="budget"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Budget"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Details */}
          <Card>
            <CardHeader>
              <CardTitle>Détail par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consumptionByCategory.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={category.percentage} className="w-24" />
                      <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                      <span className="font-bold text-primary">{category.value.toLocaleString()}€</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {movementStats.map((stat) => (
              <Card key={stat.type}>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-bold text-primary">{stat.count}</p>
                    <p className="text-sm font-medium">{stat.type}</p>
                    <Badge variant="outline" className={stat.color}>
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Évolution des Mouvements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: "Jan", incorporations: 3, retraits: 1, suspensions: 0 },
                      { month: "Fév", incorporations: 2, retraits: 0, suspensions: 1 },
                      { month: "Mar", incorporations: 4, retraits: 2, suspensions: 1 },
                      { month: "Avr", incorporations: 1, retraits: 1, suspensions: 0 },
                      { month: "Mai", incorporations: 3, retraits: 0, suspensions: 2 },
                      { month: "Jun", incorporations: 5, retraits: 1, suspensions: 1 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="incorporations" fill="var(--chart-1)" name="Incorporations" />
                    <Bar dataKey="retraits" fill="var(--chart-2)" name="Retraits" />
                    <Bar dataKey="suspensions" fill="var(--chart-3)" name="Suspensions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="families" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Consumption by Department */}
            <Card>
              <CardHeader>
                <CardTitle>Consommation par Département</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Département</TableHead>
                      <TableHead>Membres</TableHead>
                      <TableHead>Consommation</TableHead>
                      <TableHead>Moyenne</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consumptionByFamily.map((dept) => (
                      <TableRow key={dept.family}>
                        <TableCell className="font-medium">{dept.family}</TableCell>
                        <TableCell>{dept.members}</TableCell>
                        <TableCell className="font-bold text-primary">{dept.consumption.toLocaleString()}€</TableCell>
                        <TableCell>{dept.average.toLocaleString()}€</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Consumers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Consommateurs</CardTitle>
                <CardDescription>Familles avec la plus forte consommation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topConsumers.map((family, index) => (
                    <div key={family.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{family.name}</p>
                          <p className="text-xs text-muted-foreground">{family.members} membres</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{family.consumption.toLocaleString()}€</p>
                        <p className="text-xs text-muted-foreground">{family.average.toLocaleString()}€/membre</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
