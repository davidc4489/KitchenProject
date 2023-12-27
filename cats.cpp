#include "cats.hpp"

Cat::Cat(double weigth)
:m_weigth(weigth)
{
};

double Cat::getWeigth(){
    return m_weigth;
}