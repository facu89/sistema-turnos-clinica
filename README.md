# Guía de Uso del Repositorio  

## 🌱 Creación de ramas  

Siempre trabajamos en ramas específicas y **nunca en `main` directamente**.  

- Para nuevas funcionalidades:  
  ```bash
  git checkout -b feature/nombre-corto
  ```
  Ejemplo:  
  ```bash
  git checkout -b feature/registro-paciente
  ```

- Para corrección de errores:  
  ```bash
  git checkout -b fix/nombre-corto
  ```
  Ejemplo:  
  ```bash
  git checkout -b fix/bug-turno-null
  ```

🔑 Usar nombres cortos, en minúscula y separados por guiones.

---

## 📝 Formato de commits  

Los mensajes de commit deben ser **claros y cortos**.  
Formato recomendado:  

```
<tipo>: <descripción>
```

### Ejemplos:  
- `feat`: nueva funcionalidad  
- `fix`: corrección de error  
- `refactor`: mejora de código sin cambiar funcionalidad   

### Ejemplos:  
```bash
git commit -m "feat: agregar validación de email en paciente"
git commit -m "fix: corregir error de conexión con base de datos"
git commit -m "refactor: optimizar consulta SQL de turnos"
```

---

## 📤 Pushear cambios  

1. Asegurate de estar en tu rama:  
   ```bash
   git status
   ```
2. Subí tu rama al remoto:  
   ```bash
   git push origin feature/registro-paciente
   ```

---
## 🔄 Merge hacia main

Una vez finalizada tu tarea en una rama y esté checkeada...

1. **Asegurate de estar al dia con `main`:**
   ```bash
   git checkout main
   git pull origin main

2. **Pusheá tu rama al repo si aun no lo hiciste:**
   ```bash
   git push origin feature/nombre-de-la-tarea

3. **Mergear tu rama a `main`:
   ```bash
   git merge feature/nombre-de-la-tarea
> Si te aparecen conflictos git te los va a marcar, resolvelos manualmente y luego hacé:
> ```bash
> git add .
> git commit -m "merge: conflictos resueltos"
> git push origin main

4. **Subir los cambios al repo:**
   ```bash
   git push origin main
---


## ✅ Buenas prácticas  

✔️ **Commits pequeños y frecuentes** → no acumular todo en un solo commit.  
✔️ **Un commit = un cambio lógico** (ej: no mezclar fixes y features).  
✔️ **Actualizar tu rama** regularmente:  
```bash
git pull origin main
```
✔️ **Nunca pushear directo a `main` sino a tu rama**.  

---

## 📌 Ejemplo de flujo completo  

```bash
# 1. Crear rama para la nueva feature
git checkout -b feature/listar-turnos

# 2. Hacer cambios en el código
git add .
git commit -m "feat: implementar agenda de turnos para médicos"

# 3. Subir la rama
git push origin feature/agenda-turnos

# 4. Mergear con main
git checkout main
git pull origin main
git merge feature/nombre-feature

```
