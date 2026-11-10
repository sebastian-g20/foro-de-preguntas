from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import  generics
from .models import Pregunta, Respuesta
from .serializers import PreguntaSerializer, RespuestaSerializer, RegistroSerializer
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

class RegistroView(generics.CreateAPIView):
    serializer_class = RegistroSerializer
    permission_classes = [AllowAny]

class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(autor = self.request.user)

class RespuestaViewSet(viewsets.ModelViewSet):
    serializer_class = RespuestaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

    def get_queryset(self):
        return  Respuesta.objects.filter(pregunta_sid=self.kwargs["pregunta"])

    def perform_create(self, serializer):
        serializer.save(
            autor = self.request.user,
            pregunta_id = self.kwargs["pregunta"]
        )