"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Shield, MapPin, Phone, Clock, Star, CheckCircle, XCircle, Eye, Navigation } from "lucide-react"

export default function GuaranteesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedProvider, setSelectedProvider] = useState<any>(null)
  const [isProviderDialogOpen, setIsProviderDialogOpen] = useState(false)

  // Mock data - in real app this would come from API
  const guarantees = [
    {
      id: 1,
      name: "Consultations Généralistes",
      coverage: 100,
      ceiling: 25,
      consumed: 18.5,
      consumedAmount: 1850,
      totalBudget: 2500,
      status: "included",
      description: "Consultations chez médecin généraliste",
    },
    {
      id: 2,
      name: "Consultations Spécialistes",
      coverage: 80,
      ceiling: 35,
      consumed: 22.8,
      consumedAmount: 2280,
      totalBudget: 3500,
      status: "included",
      description: "Consultations chez médecin spécialiste",
    },
    {
      id: 3,
      name: "Pharmacie",
      coverage: 100,
      ceiling: 150,
      consumed: 89.2,
      consumedAmount: 8920,
      totalBudget: 15000,
      status: "included",
      description: "Médicaments prescrits",
    },
    {
      id: 4,
      name: "Optique",
      coverage: 60,
      ceiling: 200,
      consumed: 45.5,
      consumedAmount: 4550,
      totalBudget: 20000,
      status: "included",
      description: "Lunettes et lentilles",
    },
    {
      id: 5,
      name: "Dentaire",
      coverage: 70,
      ceiling: 300,
      consumed: 67.3,
      consumedAmount: 6730,
      totalBudget: 30000,
      status: "included",
      description: "Soins dentaires",
    },
    {
      id: 6,
      name: "Hospitalisation",
      coverage: 100,
      ceiling: 0,
      consumed: 12.4,
      consumedAmount: 12400,
      totalBudget: 100000,
      status: "included",
      description: "Frais d'hospitalisation",
    },
    {
      id: 7,
      name: "Médecines Douces",
      coverage: 0,
      ceiling: 0,
      consumed: 0,
      consumedAmount: 0,
      totalBudget: 0,
      status: "excluded",
      description: "Acupuncture, homéopathie",
    },
    {
      id: 8,
      name: "Chirurgie Esthétique",
      coverage: 0,
      ceiling: 0,
      consumed: 0,
      consumedAmount: 0,
      totalBudget: 0,
      status: "excluded",
      description: "Interventions esthétiques non médicales",
    },
  ]

  const healthcareProviders = [
    {
      id: 1,
      name: "Clinique Saint-Jean",
      type: "Clinique",
      specialty: "Chirurgie",
      address: "123 Rue de la Santé, 75001 Paris",
      city: "Paris",
      phone: "01 42 34 56 78",
      rating: 4.8,
      distance: 2.3,
      openingHours: "24h/24",
      isPartner: true,
      services: ["Urgences", "Chirurgie", "Maternité"],
    },
    {
      id: 2,
      name: "Dr. Marie Dubois",
      type: "Médecin",
      specialty: "Cardiologie",
      address: "45 Avenue des Champs, 75008 Paris",
      city: "Paris",
      phone: "01 45 67 89 01",
      rating: 4.9,
      distance: 1.8,
      openingHours: "8h-18h",
      isPartner: true,
      services: ["Consultation", "ECG", "Échographie"],
    },
    {
      id: 3,
      name: "Pharmacie Centrale",
      type: "Pharmacie",
      specialty: "Pharmacie",
      address: "78 Boulevard Saint-Michel, 75006 Paris",
      city: "Paris",
      phone: "01 43 25 67 89",
      rating: 4.5,
      distance: 0.9,
      openingHours: "8h-20h",
      isPartner: true,
      services: ["Médicaments", "Parapharmacie", "Orthopédie"],
    },
    {
      id: 4,
      name: "Centre Dentaire Moderne",
      type: "Cabinet",
      specialty: "Dentaire",
      address: "12 Rue du Faubourg, 69001 Lyon",
      city: "Lyon",
      phone: "04 78 12 34 56",
      rating: 4.6,
      distance: 5.2,
      openingHours: "9h-19h",
      isPartner: true,
      services: ["Soins", "Orthodontie", "Implants"],
    },
    {
      id: 5,
      name: "Optique Vision Plus",
      type: "Opticien",
      specialty: "Optique",
      address: "89 Cours Lafayette, 69003 Lyon",
      city: "Lyon",
      phone: "04 72 45 67 89",
      rating: 4.4,
      distance: 3.7,
      openingHours: "9h-18h30",
      isPartner: true,
      services: ["Lunettes", "Lentilles", "Examens"],
    },
  ]

  const filteredProviders = healthcareProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCity = selectedCity === "all" || provider.city.toLowerCase() === selectedCity.toLowerCase()
    const matchesSpecialty =
      selectedSpecialty === "all" || provider.specialty.toLowerCase() === selectedSpecialty.toLowerCase()

    return matchesSearch && matchesCity && matchesSpecialty
  })

  const includedGuarantees = guarantees.filter((g) => g.status === "included")
  const excludedGuarantees = guarantees.filter((g) => g.status === "excluded")

  const handleProviderClick = (provider: any) => {
    setSelectedProvider(provider)
    setIsProviderDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Garanties & Réseau de Soins</h1>
          <p className="text-muted-foreground">Couvertures et établissements partenaires</p>
        </div>
      </div>

      <Tabs defaultValue="guarantees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guarantees">Garanties</TabsTrigger>
          <TabsTrigger value="network">Réseau de Soins</TabsTrigger>
        </TabsList>

        <TabsContent value="guarantees" className="space-y-6">
          {/* Guarantees Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-primary">{includedGuarantees.length}</p>
                    <p className="text-xs text-muted-foreground">Garanties incluses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <div>
                    <p className="text-2xl font-bold text-destructive">{excludedGuarantees.length}</p>
                    <p className="text-xs text-muted-foreground">Garanties exclues</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-2xl font-bold text-accent">
                      {Math.round(
                        includedGuarantees.reduce((sum, g) => sum + g.consumed, 0) / includedGuarantees.length,
                      )}
                      %
                    </p>
                    <p className="text-xs text-muted-foreground">Consommation moyenne</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Included Guarantees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Garanties Incluses
              </CardTitle>
              <CardDescription>Couvertures et niveaux de remboursement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {includedGuarantees.map((guarantee) => (
                  <div key={guarantee.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{guarantee.name}</h4>
                        <p className="text-sm text-muted-foreground">{guarantee.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="bg-primary">
                          {guarantee.coverage}% de couverture
                        </Badge>
                        {guarantee.ceiling > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">Plafond: {guarantee.ceiling}€/an</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Consommation</span>
                        <span className="font-medium">
                          {guarantee.consumedAmount.toLocaleString()}€ / {guarantee.totalBudget.toLocaleString()}€
                        </span>
                      </div>
                      <Progress value={guarantee.consumed} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{guarantee.consumed.toFixed(1)}% utilisé</span>
                        <span>
                          {guarantee.totalBudget > 0
                            ? `${(guarantee.totalBudget - guarantee.consumedAmount).toLocaleString()}€ restant`
                            : "Illimité"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Excluded Guarantees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" />
                Garanties Exclues
              </CardTitle>
              <CardDescription>Prestations non couvertes par votre contrat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {excludedGuarantees.map((guarantee) => (
                  <div key={guarantee.id} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{guarantee.name}</h4>
                      <p className="text-sm text-muted-foreground">{guarantee.description}</p>
                    </div>
                    <Badge variant="destructive">Non couvert</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Rechercher un Professionnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nom, spécialité, adresse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes spécialités</SelectItem>
                    <SelectItem value="chirurgie">Chirurgie</SelectItem>
                    <SelectItem value="cardiologie">Cardiologie</SelectItem>
                    <SelectItem value="dentaire">Dentaire</SelectItem>
                    <SelectItem value="optique">Optique</SelectItem>
                    <SelectItem value="pharmacie">Pharmacie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Network Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{healthcareProviders.length}</p>
                  <p className="text-xs text-muted-foreground">Professionnels partenaires</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">15</p>
                  <p className="text-xs text-muted-foreground">Villes couvertes</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">4.7</p>
                  <p className="text-xs text-muted-foreground">Note moyenne</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">98%</p>
                  <p className="text-xs text-muted-foreground">Taux de satisfaction</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Providers List */}
          <Card>
            <CardHeader>
              <CardTitle>Établissements Partenaires</CardTitle>
              <CardDescription>{filteredProviders.length} résultats trouvés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="p-4 bg-muted/50 rounded-lg hover:bg-muted/70 cursor-pointer transition-colors"
                    onClick={() => handleProviderClick(provider)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{provider.name}</h4>
                          <Badge variant="outline">{provider.type}</Badge>
                          {provider.isPartner && (
                            <Badge variant="default" className="bg-primary">
                              Partenaire
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{provider.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>{provider.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{provider.openingHours}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{provider.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{provider.distance} km</span>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Provider Details Dialog */}
      <Dialog open={isProviderDialogOpen} onOpenChange={setIsProviderDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProvider?.name}</DialogTitle>
            <DialogDescription>{selectedProvider?.specialty}</DialogDescription>
          </DialogHeader>

          {selectedProvider && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Informations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedProvider.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedProvider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedProvider.openingHours}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.services?.map((service: string) => (
                      <Badge key={service} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsProviderDialogOpen(false)} className="flex-1">
                  Fermer
                </Button>
                <Button className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
