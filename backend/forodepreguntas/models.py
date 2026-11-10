from django.db import models
from django.conf import settings

class User(models.Model):
    usuario = models.CharField(max_length=15)
    contraseña= models.CharField(max_length=20)
    correo= models.EmailField(max_length=254, unique=True)

class Pregunta(models.Model):
    titulo = models.CharField(max_length=300)
    contenido = models.CharField(max_length=300)
    fecha = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,
                                related_name="preguntas")

class Respuesta(models.Model):
    contenido= models.CharField(max_length=300)
    fecha = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, 
                                related_name="respuestas_escritas")
    pregunta = models.ForeignKey(Pregunta,on_delete=models.CASCADE,
                                related_name="respuestas")
