"use client";

import React, { useState, useEffect } from "react";
import PersonalForm from "./PersonalForm";
import { User } from "@/types/User";
import { fetchUsers } from "@/api/userApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IHomepage {}

const Homepage: React.FC<IHomepage> = (props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {users.map((user, index) => {
        const { name, email, phone } = user || {};

        return (
          <Card key={`card${index}`} className="mb-4 last:mb-0">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                {email} | {phone}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/users/${user.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Button>Generate PDF</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};

export default Homepage;
