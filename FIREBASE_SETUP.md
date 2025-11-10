# Configuração do Firebase

## Erro: "Missing or insufficient permissions"

Para resolver este erro, você precisa configurar as regras de segurança do Firestore:

### Passos:

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione o projeto "natasha-terapia"
3. No menu lateral, clique em "Firestore Database"
4. Clique na aba "Regras" (Rules)
5. Substitua o conteúdo atual pelas regras do arquivo `firestore.rules`
6. Clique em "Publicar" (Publish)

### Regras de Segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;
      
      match /teste/{testId} {
        allow read, write: if true;
      }
      
      match /sessao_agendada/{scheduleId} {
        allow read, write: if true;
      }
    }
  }
}
```

**Importante:** Estas regras permitem acesso público para desenvolvimento. Para produção, implemente regras mais restritivas baseadas em autenticação.