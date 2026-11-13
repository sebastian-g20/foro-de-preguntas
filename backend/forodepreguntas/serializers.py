from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Pregunta,Respuesta

User = get_user_model()

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
    write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ["id", "username", "password" ,"email"]
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class PreguntaSerializer(serializers.ModelSerializer):
    autor_usuario = serializers.CharField(source='autor.username', read_only=True)
    class Meta:
        model = Pregunta
        fields = ["id", "titulo", "contenido", "fecha", "autor", "autor_usuario"]
        read_only_fields = ["id","fecha","autor","autor_usuario"]


class RespuestaSerializer(serializers.ModelSerializer):
    autor_usuario = serializers.CharField(source='autor.username', read_only=True)
    class Meta:
        model = Respuesta
        fields = ["id", "contenido", "fecha", "autor","autor_usuario", "pregunta"]
        read_only_fields = ["id","fecha","autor","pregunta","autor_usuario"]
   