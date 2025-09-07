"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, UserPlus, UserMinus, UserX, AlertTriangle, Eye, Download, Users, User, Calendar } from "lucide-react"

export default function InsuredPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedInsured, setSelectedInsured] = useState<any>(null)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [requestType, setRequestType] = useState<"incorporation" | "withdrawal" | "suspension">("incorporation")

  // Mock data - in real app this would come from API
  const insuredList = [
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      type: "principal",
      family: "Famille Dupont",
      birthDate: "1985-03-15",
      age: 38,
      status: "active",
      joinDate: "2020-01-15",
      dependents: 2,
      hasAlert: false,
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Dupont",
      type: "dependent",
      family: "Famille Dupont",
      birthDate: "1987-07-22",
      age: 36,
      status: "active",
      joinDate: "2020-01-15",
      dependents: 0,
      hasAlert: false,
    },
    {
      id: 3,
      firstName: "Lucas",
      lastName: "Dupont",
      type: "dependent",
      family: "Famille Dupont",
      birthDate: "2003-11-10",
      age: 20,
      status: "active",
      joinDate: "2020-01-15",
      dependents: 0,
      hasAlert: true, // Proche de la limite d'âge
    },
    {
      id: 4,
      firstName: "Sophie",
      lastName: "Martin",
      type: "principal",
      family: "Famille Martin",
      birthDate: "1965-05-08",
      age: 58,
      status: "active",
      joinDate: "2019-03-01",
      dependents: 1,
      hasAlert: true, // Proche de la limite d'âge
    },
    {
      id: 5,
      firstName: "Pierre",
      lastName: "Laurent",
      type: "principal",
      family: "Famille Laurent",
      birthDate: "1978-12-03",
      age: 45,
      status: "suspended",
      joinDate: "2021-06-15",
      dependents: 3,
      hasAlert: false,
    },
  ]

  const pendingRequests = [
    {
      id: 1,
      type: "incorporation",
      insuredName: "Emma Moreau",
      family: "Famille Moreau",
      requestDate: "2025-01-08",
      status: "pending",
      reason: "Nouvelle embauche",
    },
    {
      id: 2,
      type: "suspension",
      insuredName: "Paul Dubois",
      family: "Famille Dubois",
      requestDate: "2025-01-07",
      status: "in-progress",
      reason: "Congé sans solde",
    },
    {
      id: 3,
      type: "withdrawal",
      insuredName: "Claire Bernard",
      family: "Famille Bernard",
      requestDate: "2025-01-05",
      status: "approved",
      reason: "Fin de contrat",
    },
  ]

  const filteredInsured = insuredList.filter((person) => {
    const matchesSearch =
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.family.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || person.status === statusFilter
    const matchesType = typeFilter === "all" || person.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: insuredList.length,
    principal: insuredList.filter((p) => p.type === "principal").length,
    dependents: insuredList.filter((p) => p.type === "dependent").length,
    alerts: insuredList.filter((p) => p.hasAlert).length,
  }

  const handleNewRequest = (type: "incorporation" | "withdrawal" | "suspension") => {
    setRequestType(type)
    setIsRequestDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Assurés</h1>
          <p className="text-muted-foreground">Gérez votre personnel assuré et leurs demandes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total assurés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{stats.principal}</p>
                <p className="text-xs text-muted-foreground">Assurés principaux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">{stats.dependents}</p>
                <p className="text-xs text-muted-foreground">Ayants droit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{stats.alerts}</p>
                <p className="text-xs text-muted-foreground">Alertes actives</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.alerts > 0 && (
        <Alert className="border-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {stats.alerts} assurés nécessitent votre attention (limites d'âge approchées)
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Liste des Assurés</CardTitle>
            <CardDescription>Personnel assuré par famille</CardDescription>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou famille..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="suspended">Suspendu</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="principal">Principal</SelectItem>
                  <SelectItem value="dependent">Ayant droit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Famille</TableHead>
                  <TableHead>Âge</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInsured.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {person.hasAlert && <AlertTriangle className="w-4 h-4 text-destructive" />}
                        <div>
                          <p className="font-medium">
                            {person.firstName} {person.lastName}
                          </p>
                          {person.type === "principal" && person.dependents > 0 && (
                            <p className="text-xs text-muted-foreground">{person.dependents} ayant(s) droit</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={person.type === "principal" ? "default" : "secondary"}>
                        {person.type === "principal" ? "Principal" : "Ayant droit"}
                      </Badge>
                    </TableCell>
                    <TableCell>{person.family}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {person.age} ans
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          person.status === "active"
                            ? "default"
                            : person.status === "suspended"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {person.status === "active" ? "Actif" : person.status === "suspended" ? "Suspendu" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedInsured(person)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Actions and Requests */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Nouvelles Demandes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => handleNewRequest("incorporation")}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Incorporation
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => handleNewRequest("suspension")}
              >
                <UserMinus className="w-4 h-4 mr-2" />
                Suspension
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => handleNewRequest("withdrawal")}
              >
                <UserX className="w-4 h-4 mr-2" />
                Retrait
              </Button>
            </CardContent>
          </Card>

          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Demandes en Cours</CardTitle>
              <CardDescription>Suivi des demandes récentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{request.insuredName}</p>
                      <Badge
                        variant={
                          request.status === "approved"
                            ? "default"
                            : request.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {request.status === "approved"
                          ? "Approuvé"
                          : request.status === "pending"
                            ? "En attente"
                            : "En cours"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground capitalize mb-1">
                      {request.type === "incorporation"
                        ? "Incorporation"
                        : request.type === "suspension"
                          ? "Suspension"
                          : "Retrait"}
                    </p>
                    <p className="text-xs text-muted-foreground">{request.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Request Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Nouvelle demande de{" "}
              {requestType === "incorporation"
                ? "incorporation"
                : requestType === "suspension"
                  ? "suspension"
                  : "retrait"}
            </DialogTitle>
            <DialogDescription>Remplissez les informations nécessaires pour votre demande</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Prénom" />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Nom" />
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Motif</Label>
              <Textarea id="reason" placeholder="Précisez le motif de la demande..." />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)} className="flex-1">
                Annuler
              </Button>
              <Button onClick={() => setIsRequestDialogOpen(false)} className="flex-1">
                Soumettre la demande
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
