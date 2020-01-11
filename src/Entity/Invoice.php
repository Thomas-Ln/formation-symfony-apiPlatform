<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 * @ApiResource(
 *  subresourceOperations={
 *      "api_customers_invoices_get_subresource"={
 *          "normalization_context"={"groups"={"invoices_subresource"}
 *      }
 *  }
 * },
 * itemOperations={
 *  "get",  "put", "delete", "increment"={
 *      "method"="post",
 *      "path"="/invoices/{id}/increment",
 *      "controller"="App\Controller\InvoiceIncrementationController",
 *      "openapi_context"={
 *          "summary"="Increment invoice",
 *          "description"="Increment chrono of invoice {id}"}
 *  }
 * },
 *  attributes={
 *      "pagination_enabled"=true,
 *      "pagination_items_per_page"=20,
 *      "order": {"sentAt":"desc"}
 * },
 *  normalizationContext={"groups"={"invoices_read"}},
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="cannot be empty !")
     * @Assert\Type(type="numeric", message="must be a numeric value !")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read"})

     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read"})
     * @Assert\NotBlank(message="cannot be empty !")
     * @Assert\Choice(choices={"SENT", "PAID", "CANCELLED"}, message="must be 'SENT', PAID', or 'CANCELLED' value")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="cannot be empty !")
     *
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read"})
     * @Assert\NotBlank(message="cannot be empty !")
     * @Assert\Type(type="integer", message="must be a integer value !")
     */
    private $chrono;

    /**
     * return seller
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="cannot be empty !")
     *
     * @return User
     */
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
