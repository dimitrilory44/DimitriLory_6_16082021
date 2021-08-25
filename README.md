# Piiquante

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

## Front-end

La partie front-end a déjà été réalisée.

C'est un projet développé sur Angular CLI 7.0.2.

Aller sur ce [lien](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) et cloner le projet.

```bash
  git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git frontend
  cd frontend
```

Tester le démarrage avec `npm start`. Si ça ne fonctionne pas voir la section suivante.

### Résolution problèmes existant

Plusieurs actions seront necéssaire avant de lancer ce projet :
    
Lancer les dépendances avec `npm install`.

Si il y a des erreurs `npm audit fix`. Continuer avec `npm audit fix --force` s'il y a d'autres erreurs.

Appliquer ensuite `ng update @angular/cli` vu que nous avons à faire à une version ancienne d'Angular.

Committer votre changement en réalisant la tache suivante :
  
     git add -A
     git commit -m "mon super message de commit"
     ng update @angular/cli

Mettre à jour le core de Angular :

     ng update @angular/cli

Si les problème persiste :

     ng update @angular/core --force

Enfin mettre à jour la bibliothèque rxjs :

     ng update rxjs

Maintenant lancer la commande :

     npm start

## Back-end

Cloner ce projet avec la commande suivante :

```bash
  git clone https://github.com/dimitrilory44/DimitriLory_6_16082021.git
  cd backend
```

Installer les dépendances avec `npm install`.

Démarrer enfin le serveur avec `npm run serve`.

Si vous voulez persister vos données, inscrivez-vous sur le site mangoDB en suivant ce [lien](https://www.mongodb.com/fr-fr).

En suivant la documentation, connecter votre application en générant un lien et remplacer `${process.env.MONGO_URL}` par celui-ci. 